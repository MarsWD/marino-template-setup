define(['base/js/namespace', 'base/js/events'], function (Jupyter, events) {
  // Template cells including markdown and imports
  var setUp = function () {
    Jupyter.notebook.insert_cell_at_index('markdown', 0)
      .set_text(`# Introduction
## Notebook title
Description of the notebook

|**Created by:** |Your name here|
|---|---|
|**Created on:** |date|
|**Last updated on:** |date|`)
    Jupyter.notebook.insert_cell_at_index('markdown', 1).set_text(`### Imports
Import libraries and write settings here.`)
    // Define imports and settings, remove what you don't need!
    Jupyter.notebook.insert_cell_at_index('code', 2)
      .set_text(`# Data manipulation
# Import required modules
import pandas as pd
import numpy as np
import sqlalchemy
# Plotting
import matplotlib.pyplot as plt
import plotly as py
import cufflinks as cf`)
    Jupyter.notebook.insert_cell_at_index('markdown', 3)
      .set_text(`### Functions
Define any functions you need in the main part of the code`)
    Jupyter.notebook.insert_cell_at_index('markdown', 4).set_text(`# Data manipulation
Edit the data here`)
    Jupyter.notebook.insert_cell_at_index('markdown', 5).set_text(`# Results
Show graphs and stats here`)
    Jupyter.notebook.insert_cell_at_index('markdown', 6)
      .set_text(`# Conclusions and Next Steps
Summarize findings here`)
    // Run all cells
    Jupyter.notebook.execute_all_cells()
  }
  // Prompts user to enter name for notebook
  var promptName = function () {
    // Open rename notebook box if 'Untitled' in name
    if (Jupyter.notebook.notebook_name.search('Untitled') != -1) {
      document.getElementsByClassName('filename')[0].click()
    }
  }
  // Run on start
  function load_ipython_extension () {
    // Add default cells for new notebook
    if (Jupyter.notebook.get_cells().length === 1) {
      setTimeout(setUp, 500)
    } else {
      promptName()
    }
  }
  // Run when cell is executed
  events.on('execute.CodeCell', function () {
    promptName()
  })
  // Run when notebook is saved
  events.on('before_save.Notebook', function () {
    promptName()
  })
  return {
    load_ipython_extension: load_ipython_extension
  }
})
