import React from 'react';
import { Column } from '../components/Grid';

export function createColumns({ breakpoint, total, span }) {
  return Array.from({ length: total }, (_, i) => (
    <Column key={i} breakpoint={breakpoint} span={span}>
      <div className="outside">
        <div className="inside">{span}</div>
      </div>
    </Column>
  ));
}
