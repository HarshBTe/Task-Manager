const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const count = await Project.countDocuments({ user: req.user._id });
  if (count >= 4) return res.status(400).send({ error: 'Max 4 projects allowed' });

  const project = new Project({ name: req.body.name, user: req.user._id });
  await project.save();
  res.status(201).send(project);
};


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
