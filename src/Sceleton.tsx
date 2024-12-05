import { Table } from "react-bootstrap";

export const Sceleton = () => {
  return (
    <>
      <Table bordered hover>
        <thead>
          <tr className="placeholder-glow">
            {Array.from({ length: 4 }).map((_, i) => (
              <th key={i}>
                <span className="placeholder col-2"></span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 20 }).map((_, row) => (
            <tr key={row} className="placeholder-glow">
              {Array.from({ length: 4 }).map((_, col) => (
                <td key={col}>
                  <span className="placeholder col-6"></span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
