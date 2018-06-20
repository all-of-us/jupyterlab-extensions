class ConceptSearchForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
      disabled: true
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <form>
        <FormControl
          [disableControl]="disabled"
          type="text"
          value={this.state.value}
          placeholder="Enter keywords"
          onChange={this.handleChange}
        />
        <Button [disableControl]="disabled" className="btn btn-primary btn-large centerButton" type="submit">Search</Button>
      </form>
    );
  }
}