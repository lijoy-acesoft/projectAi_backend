const { Task } = require("../models/project/Task");


exports.getAllTasks = async (req, res, next) => {
        const projectId = req.params.projectId;
        try {
          const tasks = await Task.findAll({
            where: { projectId: projectId }
          });
          res.json({ tasks });
        } catch (err) {
          console.error('Error fetching tasks:', err);
          res.status(500).json({ error: 'Failed to fetch tasks' });
        }
  };