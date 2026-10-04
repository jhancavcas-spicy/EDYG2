import * as d3 from "d3";
import type { Node } from "./Node";
import { toD3Data, type TreeData } from "./toD3Data";

// Dibuja el árbol binario dentro del elemento indicado (por ejemplo "#tree")
export function drawTree(root: Node | null, selector: string): void {
  if (root === null) return;

  const width = 720;
  const height = 380;
  const margin = 50;

  // 1. Convertir nuestro árbol a datos de D3 y crear la jerarquía
  const hierarchy = d3.hierarchy<TreeData>(toD3Data(root));

  // 2. Aplicar el layout "tree": calcula la posición (x, y) de cada nodo
  const layout = d3.tree<TreeData>().size([width - 2 * margin, height - 2 * margin]);
  const treeRoot = layout(hierarchy);

  // 3. Crear el SVG
  const svg = d3
    .select(selector)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);
  const g = svg.append("g").attr("transform", `translate(${margin},${margin})`);

  // 4. Conexiones: una línea del padre a cada hijo (se omiten los huecos)
  g.selectAll("line")
    .data(treeRoot.links().filter((link) => link.target.data.value !== null))
    .join("line")
    .attr("class", (d) => `link ${d.target.data.side}`)
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  // 5. Nodos: un círculo con su valor (se omiten los huecos)
  const nodes = g
    .selectAll("g.node")
    .data(treeRoot.descendants().filter((d) => d.data.value !== null))
    .join("g")
    .attr("class", (d) => `node ${d.data.side}`)
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  nodes.append("circle").attr("r", 20);
  nodes
    .append("text")
    .attr("dy", "0.35em")
    .text((d) => String(d.data.value));
}
