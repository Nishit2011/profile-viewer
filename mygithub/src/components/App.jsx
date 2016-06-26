import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';
class App extends Component{
//instead of using getInitialState for defining initial state, for ECMA6,we use a constructor
constructor(props){
//this runs whenever a class is instantiated or object is created
super(props);
this.state ={
	username:'Nishit2011',
	userData:[],
	userRepos:[],
	perPage:5
}

}




//GetUser Data from GitHub
getUserData(){

$.ajax({

url:'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
dataType:'json',
cache:false,
success:function (data){
   console.log(data);
   this.setState({userData:data});
}.bind(this),
error:function(xhr,status,err){
this.setState({username:null});
alert(err);
}.bind(this)
});

}


//GetUser Repos from GitHub
getUserRepos(){

$.ajax({

url:'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
dataType:'json',
cache:false,
success:function (data){
   console.log(data);
   this.setState({userRepos:data});
}.bind(this),
error:function(xhr,status,err){
this.setState({username:null});
alert(err);
}.bind(this)
});

}
handleFormSubmit(username){
this.setState({username:username},function(){
this.getUserData();
this.getUserRepos();

});
}

componentDidMount(){
//alert("----");
this.getUserData();
this.getUserRepos();
}

render(){
return(
<div>
<Search onFormSubmit ={this.handleFormSubmit.bind(this)}/>
<Profile {...this.state} />
</div>
)
}
}

App.propTypes ={
clientId:React.PropTypes.string,
clientSecret:React.PropTypes.string

};
App.defaultProps={
clientId:'b410c791e3bfe76a5fa0',
clientSecret:'c5ac9c265fdeee19a0e4ad215e7062cc2916b939'
};
export default App