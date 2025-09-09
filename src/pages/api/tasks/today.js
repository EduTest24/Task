import { getTasksClient } from "@/lib/utils/googleTasks";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const tasksClient = await getTasksClient(userId);

    // --- Get query parameters ---
    const { startDate, endDate } = req.query;

    // Default to today's UTC date if no params provided
    const todayUTC = new Date();
    const yyyy = todayUTC.getUTCFullYear();
    const mm = todayUTC.getUTCMonth();
    const dd = todayUTC.getUTCDate();

    const defaultStart = new Date(Date.UTC(yyyy, mm, dd, 0, 0, 0, 0));
    const defaultEnd = new Date(Date.UTC(yyyy, mm, dd, 23, 59, 59, 999));

    // Normalize inputs (if provided)
    const start = startDate
      ? new Date(`${startDate}T00:00:00.000Z`)
      : defaultStart;
    const end = endDate ? new Date(`${endDate}T23:59:59.999Z`) : defaultEnd;

    // --- Get all task lists ---
    const listsResponse = await tasksClient.tasklists.list();
    const taskLists = listsResponse.data.items || [];

    let allTasks = [];

    // --- Loop through each list ---
    for (const list of taskLists) {
      const response = await tasksClient.tasks.list({
        tasklist: list.id,
        showCompleted: false,
      });

      const tasks = response.data.items || [];
      allTasks = allTasks.concat(
        tasks.map((t) => ({ ...t, tasklistName: list.title }))
      );
    }

    // --- Filter by date ---
    const filteredTasks = allTasks.filter((task) => {
      if (!task.due) return false;

      // Google sets due in RFC 3339 format, midnight UTC
      const dueDate = new Date(task.due);

      return dueDate >= start && dueDate <= end;
    });

    res.status(200).json({ tasks: filteredTasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: err.message });
  }
}
