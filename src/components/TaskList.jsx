import React from 'react';

function TaskList({ tasks }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.idTask}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td className={task.status ? 'complete' : 'pending'}>{task.status ? 'Completada' : 'Pendiente'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

export default TaskList