import React from 'react'

class searchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            location: "",
        };
    }
    
    onInputChange(e){
        this.setState({
            location: e.target.value
        });
    }
    onFormSubmit(e){
        e.preventDefault();
    };
    

    render(){
        const location = this.state.location;
        return (
            <div>
                <form>
                    {location}
                    <button type="submit">
                        Search
                    </button>
                    <input 
                    name="Search" 
                    id = "search" 
                    value={location} 
                    onChange={(e)=>this.onInputChange(e)}>
                    </input>
                </form>
            </div>
        )
    }
}

export default searchBar;
