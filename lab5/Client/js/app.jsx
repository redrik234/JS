var App = React.createClass({
  render: function() {
    return (
    <div>
      <button id='button'>Update list</button>
      <ul id='file_list'>
      </ul>
    </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);