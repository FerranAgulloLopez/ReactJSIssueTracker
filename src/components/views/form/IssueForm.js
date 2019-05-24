import React from 'react';

class IssueForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,

        };
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      };

   render() {

      return (

         <div class="form-group">
          <label>
            hola
            <input
               name="title"
               type="text_field"
               checked={this.state.isGoing}
               onChange={this.handleInputChange} />
          </label>
        </div>

      );
   }
   }

 export default IssueForm;