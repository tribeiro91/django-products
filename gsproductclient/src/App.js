import logo from './logo.svg';
import React, {Component} from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeItem: {
        name:"",
        description:"",
        price: 0
      },
      productList: []
    };
  }

  componentDidMount(){
    this.refreshList();
  };

  refreshList = () => {
    axios
      .get("api/products/")
      .then(res => this.setState({productList: res.data}))
      .catch(err => console.log(err));
  };

  renderItems = () => {
    return this.state.productList.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className="product-title"
          >
            {item.name}
          </span>
          <span
            className="production-title"
          >
            {item.description}
          </span>
          <span>
            <button
              onClick={() => this.editItem(item)}
              className="btn btn-secondary mr-2"
            >
              Editar{" "}
            </button>
            <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
            >
              Excluir{" "}
            </button>
          </span>
        </li>
      )
    );
  };

  toggle = () => {
    this.setState({ modal : !this.state.modal });
  }

  handleSubmit = (item) => {
    this.toggle();
    if(item.id){
      axios
        .put(`api/products/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("api/products/", item)
      .then(res => this.refreshList());
  };

  handleDelete = (item) => {
    console.log(item);
    axios
      .delete(`api/products/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { name : "", description: "", price: 0};
    this.setState({activeItem: item, modal: !this.state.modal});
  }

  editItem = (item) => {
    this.setState({activeItem: item, modal: !this.state.modal});
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Lista de Produtos</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Adicionar Produto
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }

}

export default App;
