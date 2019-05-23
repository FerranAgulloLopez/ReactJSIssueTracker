import React from 'react';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: "/issues",
    }
  }

  changeScreen(screen) {
    this.setState({screen: screen});
  }

    render() {
      return (
        <div>
          <div>Home Screen</div>
        </div>
      );
    }
    
  }
  
  export default HomeScreen;