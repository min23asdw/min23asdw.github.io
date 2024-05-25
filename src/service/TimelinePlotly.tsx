import { useState } from "react";
import Plot from "react-plotly.js";
import { Layout, ScatterData } from "plotly.js";
import ProjectData from "../model/project";
import { Button, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface DataProp {
  data: ProjectData[];
}
const parseDate = (dateStr: string): Date => {
  if (dateStr === "-1") {
    return new Date(); // Ongoing project
  }
  const [month, year] = dateStr.split(" ");
  return new Date(`${month} 1, ${year}`);
};

const TimelinePlotly = (prop: DataProp) => {
  const projects = prop.data;

  const [show, setShow] = useState<boolean>(false);

  const toggleVisibility = () => {
    setShow((prev) => !prev);
  };

  const Adata = projects.map((project, index) => {
    const projectStart = parseDate(project.start);
    const projectEnd =
      project.end === "-1" ? new Date() : parseDate(project.end);

    return {
      type: "scatter",
      x: [projectStart, projectEnd],
      y: [index, index],
      mode: "lines+markers",
      line: { width: 40 },
      text: [project.title],
      textposition: "middle right",
      marker: { size: 1 },
      hoverinfo: "x+text",
    };
  });

  const data: ScatterData[] = Adata as ScatterData[];

  const layout: Partial<Layout> = {
    title: "Project Timeline",
    xaxis: {
      type: "date",
      range:  ["2020-06-01", new Date().toISOString()], 
    },
    yaxis: {
      type: "category",
      automargin: true,
      tickvals: projects.map((_, index) => index),
      ticktext: projects.map((project) => project.short),
    },
    showlegend: false,
    height: 600,
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Button key={0} onClick={() => toggleVisibility()}>
        <h3 className="text-2xl font-bold">Timeline</h3>
        {show ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse key={0} in={show} timeout="auto" style={{ width: "100%" }}>
        <Plot
          data={data}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: "100%" }}
        />
      </Collapse>
    </div>
  );
};

export default TimelinePlotly;
