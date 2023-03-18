import React from "react";
import axios from "axios";
import "./weather.css";

class WeatherReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wreport:{},searchText:""};
    this.show = false;
  }
    
  handleSearch = (event) => {
    console.log(event.target.value);
    this.setState({ searchText: event.target.value });
  };
  getReport = () => {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      this.state.searchText +
      "&appid=03afee19ef052e240bad0f6e93ebebcd&units=metric";

    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        this.setState({ wreport: res.data});
        this.show = true;
      })
      .catch((err) =>{
        if (err.response.status === 404){
          alert("Please Enter valid city name")
        }
      });
  };

  submitted = (event) => {
    event.preventDefault();
    this.getReport(this.state.searchText);
  };
  
  render() {

    
    return (
      <>
      <div>

      </div>
        <div className="container ">
          <form className="searchform" onSubmit={this.submitted}>
            <div className="form-group">
              <input
                type="text"
                className=" sicon "
                onChange={this.handleSearch}
                placeholder="Enter a city name"
              ></input>
              <input
                type="submit"
                className="btn sbut "
                value="Search"
              ></input>
            </div>
          </form>
          </div>
          
          

        <div id="result" className="container">

          
          {this.show && (

            <>
            <div className="card cardColor weatherBox aCenter">
              <div className="carousel-item active">
                <div className=" row ">
                  <div className="col-md-4">
                    <div className="tempCards">
                        <div className="temp">{this.state.wreport.main.temp.toFixed()}<h1>&deg;C</h1></div>
                          <div className="location">{this.state.wreport.name.toUpperCase()}, {this.state.wreport.sys.country.toUpperCase(

                        )}</div>

                    </div>
                  </div>
                  
                  <div className="col-md-4 item ">
                     <div className="itemalign">
                      <img className="weatherIcon" src={`http://openweathermap.org/img/w/${this.state.wreport.weather[0].icon}.png`}  alt=""/>
                     </div>
                     <div className="itemalign">
                        <div className="caption"><h4>{this.state.wreport.weather[0].description.charAt(0).toUpperCase()+this.state.wreport.weather[0].description.slice(1).toLowerCase()}</h4></div>
                    </div>
                  </div>

                  <div className="col-md-4 img-fluid ">
                    <img className="img-fluid rotate" src="https://www.transparentpng.com/download/sun/sun-clipart-images-png-7.png" alt=""></img>
                    
                  </div>


                </div>
              </div>
            </div>

            <div className="container card cardColor weatherBox">
              <div className="row">
                <div className="col-sm">Humidity
                <div><h3>{this.state.wreport.main.humidity}</h3></div>
                </div>
                <div class="col-sm">Pressure
                  <div><h3>{this.state.wreport.main.pressure}</h3></div>
                </div>
                <div class="col-sm">Feels Like
                  <div><h3>{this.state.wreport.main.feels_like.toFixed()}</h3></div>
                </div>
              </div>
            </div>
            </>
 
          )}
        </div>
      </>
    );
  }
}
export default WeatherReport;
