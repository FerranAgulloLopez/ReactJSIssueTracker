import React from 'react';
import '../../../styles/App.css';

class IssueForm extends React.Component {

    constructor(props) {
        super(props);
        let assignee = props.assignee
        let status = props.status
        if (assignee == null) assignee = 'TuMismo'
        if (props.status == null) status = 'NEW'

        this.state = {
            title: props.title,
            description: props.description,
            assignee: assignee,
            status: status,
            type: props.type,
            priority: props.priority
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

          <div>
              <label style={{fontSize: '17px'}}>
                  Title
              </label>
          </div>
          <input
             name="title"
             type="text_field"
             class="form-control"
             value={this.state.title} />

         <br />
         <div>
               <label style={{fontSize: '17px'}}>
                   Description
               </label>
         </div>
         <input
            name="description"
            type="text_area"
            class="form-control"
            value={this.state.description} />

         <br />
         <br />
         <table style={{width: '50%'}}>
            <tr>
                <th></th>
                <th></th>
            </tr>
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Assignee
                    </label>
                </td>
                <td>
                    <select value={this.state.assignee}>
                        <option value="TuMismo">TuMismo</option>
                        <option value="lime">Hola</option>
                        <option value="coconut">Antoooooooniiiiiiiiiiiiiiiii</option>
                        <option value="mango">Rubyyyyyyyyyyyyyyyyy</option>
                    </select>
                </td>
            </tr>
            <br />
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Status
                    </label>
                </td>
                <td>
                    <select value={this.state.status}>
                        <option value="NEW">NEW</option>
                        <option value="DUPLICATE">DUPLICATE</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="INVALID">INVALID</option>
                        <option value="ON HOLD">INVALID</option>
                    </select>
                </td>
            </tr>
            <br />
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Type
                    </label>
                </td>
                <td>
                    <select value={this.state.type}>
                        <option value="BUG">BUG</option>
                        <option value="ENHANCEMENT">ENHANCEMENT</option>
                        <option value="PROPOSAL">PROPOSAL</option>
                        <option value="TASK">TASK</option>
                    </select>
                </td>
            </tr>
            <br />
            <tr>
                <td>
                    <label style={{fontSize: '17px'}}>
                        Priority
                    </label>
                </td>
                <td>
                    <select value={this.state.priority}>
                        <option value="MAJOR">MAJOR</option>
                        <option value="TRIVIAL">TRIVIAL</option>
                        <option value="MINOR">MINOR</option>
                        <option value="CRITICAL">CRITICAL</option>
                        <option value="BLOCKER">BLOCKER</option>
                    </select>
                </td>
            </tr>
         </table>

         <br />
         <div className="row" style={{marginTop: '10px', marginLeft: '180px', marginRight: '200px'}}>
             <div className="col-md-6" style={{}}>
               <input type="submit" value="Submit" class="btn btn-primary" style={{color: 'white', borderColor: 'black', backgroundColor: 'black'}}/>
             </div>
             <div className="col-md-2 offset-md-4" style={{}}>
               <input type="submit" value="Back" class="btn btn-primary" style={{color: 'white', borderColor: 'black', backgroundColor: 'black'}}/>
             </div>
         </div>
        </div>
      );
   }
}

export default IssueForm;