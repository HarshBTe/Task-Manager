const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, project: req.params.projectId });
  await task.save();
  res.status(201).send(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.send(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
  res.send(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.send({ message: 'Task deleted' });
};
