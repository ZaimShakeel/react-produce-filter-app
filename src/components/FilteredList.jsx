import React, { Component } from 'react';
import List from './List';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class FilteredList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            type: "All"
        };
    }

    onSearch = (event) => {
        this.setState({
            search: event.target.value.toLowerCase()
        });
    }

    onFilter = (eventKey) => {
        this.setState({
            type: eventKey
        });
    }

    filterItem = (item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .search(this.state.search) !== -1;

        const matchesType = this.state.type === "All" ||
            item.type === this.state.type;

        return matchesSearch && matchesType;
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={this.onSearch}
                />

                <DropdownButton title="Filter" onSelect={this.onFilter}>
                    <MenuItem eventKey="All">All</MenuItem>
                    <MenuItem eventKey="Fruit">Fruit</MenuItem>
                    <MenuItem eventKey="Vegetable">Vegetables</MenuItem>
                </DropdownButton>

                <List items={this.props.items.filter(this.filterItem)} />
            </div>
        );
    }
}

export default FilteredList;