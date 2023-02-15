const express = require('express');
const axios = require('axios');

const getAllJobs = async (req, res) => {
  const search = req._parsedUrl.search;

  if (search) {
    const { data } = await axios(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json${search}`
    );

    res.send({
      data,
      message: 'get all jobs successfully',
    });
  } else {
    const { data } = await axios(
      `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`
    );

    res.send({
      data,
      message: 'get all jobs successfully',
    });
  }
};

const getJobById = async (req, res) => {
  const { data } = await axios(
    `http://dev3.dansmultipro.co.id/api/recruitment/positions/${req.params.id}`
  );

  res.send({
    data,
    message: 'get detail job successfully',
  });
};

module.exports = {
  getAllJobs,
  getJobById,
};
