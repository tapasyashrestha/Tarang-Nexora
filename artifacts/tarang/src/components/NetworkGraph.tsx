import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { nodes, edges, NodeData } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkGraphProps {
  onNodeClick: (node: NodeData) => void;
  selectedNodeId: string | null;
}

export function NetworkGraph({ onNodeClick, selectedNodeId }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return;

    const width = wrapperRef.current.clientWidth;
    const height = wrapperRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Setup defs for markers
    const defs = svg.append('defs');

    // Positive arrow
    defs.append('marker')
      .attr('id', 'arrow-positive')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', '#3B9EFF')
      .attr('d', 'M0,-5L10,0L0,5');

    // Negative arrow
    defs.append('marker')
      .attr('id', 'arrow-negative')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', '#F5A623')
      .attr('d', 'M0,-5L10,0L0,5');

    const g = svg.append('g');

    // Zoom setup
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);

    // Deep copy data for D3
    const d3Nodes = nodes.map(d => ({ ...d }));
    const d3Edges = edges.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(d3Nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(d3Edges).id((d: any) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => d.size + 20));

    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(d3Edges)
      .join('line')
      .attr('stroke', d => d.type === 'positive' ? '#3B9EFF' : '#F5A623')
      .attr('stroke-width', d => d.type === 'positive' ? 2 : 1)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-dasharray', d => d.type === 'negative' ? '4,4' : 'none')
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    const nodeGroup = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(d3Nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      )
      .on('click', (event, d: any) => {
        onNodeClick(d);
      });

    nodeGroup.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => {
        if (d.group === 'central') return '#3B9EFF';
        if (d.group === 'mid') return '#1D3D5C';
        return '#152A3E';
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', d => selectedNodeId === d.id ? 3 : 0)
      .attr('stroke-opacity', 0.8)
      .style('cursor', 'pointer');

    nodeGroup.append('text')
      .text(d => d.label)
      .attr('y', d => d.size + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '12px')
      .attr('font-family', 'Inter')
      .attr('pointer-events', 'none')
      .style('text-shadow', '0 1px 3px rgba(0,0,0,0.8)');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      nodeGroup
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [selectedNodeId]);

  return (
    <div ref={wrapperRef} className="w-full h-full relative" data-testid="network-graph-container">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
