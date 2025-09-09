import { getTasksClient } from "@/lib/utils/googleTasks"; // your wrapper

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    // Initialize Google Tasks client
    const tasks = await getTasksClient(userId);

    // Fetch task lists
    const taskListsRes = await tasks.tasklists.list();
    const taskLists = taskListsRes.data.items || [];

    const now = new Date();
    const stats = {
      pending: 0,
      completed: 0,
      overdue: 0,
    };

    // Collect full details
    const allTasks = [];

    for (const list of taskLists) {
      const resList = await tasks.tasks.list({
        tasklist: list.id,
        showCompleted: true,
        showHidden: false,
      });

      const items = resList.data.items || [];

      const formattedTasks = items.map((task) => {
        const status = task.status; // "needsAction" | "completed"
        const due = task.due ? new Date(task.due) : null;

        if (status === "completed") {
          stats.completed++;
        } else if (due && due < now) {
          stats.overdue++;
        } else {
          stats.pending++;
        }

        return {
          id: task.id,
          title: task.title,
          notes: task.notes || "",
          status: task.status,
          due: task.due || null,
          completed: task.completed || null,
          updated: task.updated || null,
          listId: list.id,
          listTitle: list.title,
        };
      });

      allTasks.push({
        listId: list.id,
        listTitle: list.title,
        tasks: formattedTasks,
      });
    }

    return res.status(200).json({
      success: true,
      stats,
      taskLists: allTasks,
    });
  } catch (error) {
    console.error("Error fetching tasks overview:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Google Tasks",
    });
  }
}
