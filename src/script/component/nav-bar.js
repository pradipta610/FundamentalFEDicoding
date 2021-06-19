class NavBar extends HTMLElement {
  connectedCallback(){
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
}

get value() {
    return this.querySelector("#searchElement").value;
 }

  render(){
    this.innerHTML =`
    <style>

    .navbar{
      margin-bottom :20px;
    }

    section{
      display : flex;
      width : 100%;
      overflow-x: auto;

    }

    section img{
      width : 300px;
      margin: 0 10px;
    }

    img:hover{
      margin-left: 0 50px;
      cursor: pointer;
      transform:scale(1.2);
      transition :0.3s;
    }
    .content{
      border : 12px solid black;
      margin :5px;
      display : none;
    }
    .content div{
      display : flex;
      justify-content: space-around;
      flex-wrap :wrap;
      margin: 10px;
    }
    .content-display{
      display :block;
    }
    #content-close {
      cursor:pointer;
    }
  
    </style>
    
    <nav class="navbar navbar-light bg-info">
    <a class="navbar-brand font-weight-bold">Best Movie Finder</a>
    <form class="form-inline">
      <input id="searchElement" class="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search">
      <button  id="searchButtonElement" class="btn btn-outline-success my-2 my-sm-0 bg-light" type="submit">Search</button>
    </form>
  </nav>`

  this.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
  }
}

customElements.define("nav-bar", NavBar);