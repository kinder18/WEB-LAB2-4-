import React, { Component } from "react";
import AccordionHeader from "./AccordionHeader";
import Checkbox from "./Checkbox";

import host from '../config';


let FILTERS = [];
const SORTING = ["title", "-title"];

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",

            filters: FILTERS.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false,
                }),
                {}
            ),

            sorting: SORTING.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false,
                }),
                {}
            ),
        };
    }

    componentDidMount() {
		const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
            }
        }
        fetch(`${host}api/v1/app/genre/list/`, options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    this.props.history.push("/login");
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                FILTERS = Array.from(data.map(genre => genre.id));

                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    handleFiltersChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            filters: {
              ...prevState.filters,
              [name]: !prevState.filters[name],
            },
        }));

        this.props.createFiltersList(this.handleFiltersList.bind(this));
    };

    handleSortingChange = changeEvent => {
        const { name } = changeEvent.target;
        const mustBeUnchecked = Object
            .keys(this.state.sorting)
            .filter(option => name !== option);

        this.setState(prevState => ({
            sorting: {
              ...prevState.sorting,
              [name]: !prevState.sorting[name],
              [mustBeUnchecked]: false,
            },
        }));

        this.props.createSortingList(this.handleSortingList.bind(this));
    }

    handleFiltersList() {
        const checkedFilters = (Object
            .keys(this.state.filters)
            .filter(option => this.state.filters[option])
        );
        
        this.props.formFilterQuery(checkedFilters);
    };

    handleSortingList() {
        const checkedSorting = (Object
            .keys(this.state.sorting)
            .filter(option => this.state.sorting[option])
        );
        
        this.props.formSortingQuery(checkedSorting);
    }

	render() {
		if (this.props.accordionHeader === "genres") {
            return (
                <div>
                    <div className="accordion-btn .active opened active">
                        {(() => {
                            if (this.props.className === "accordion-content content-sidebar") {
                                return (<AccordionHeader className="filters-title filters-title-sidebar" accordionName="Categories" />);
                            } else {
                                return (<AccordionHeader className="filters-title" accordionName="Categories" />);
                            }
                        })()}
                    </div>
                    <div className="panel" style={{ maxHeight: "1200px" }}>
                        <div className={ this.props.className }>
                            <div className="treeview">
                                <div className="checkbox-section">
                                    <div className="col-6 col-12-small">
                                        <ul className="list">
                                            {this.state.data.map(genre => {
                                                const id = this.props.namePrefix + "Filter" + genre.id;
                                                return (
                                                    <li id="check-box" className="list-item" key={ id }>
                                                        <Checkbox
                                                            id={ id }
                                                            name={ genre.id }
                                                            text={ "Computer Science" }
                                                            isSelected={ this.state.filters[genre.id] }
                                                            onCheckboxChange={ this.handleFiltersChange } />
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="accordion-btn .active">
                        {(() => {
                            if (this.props.className === "accordion-content content-sidebar") {
                                return (<AccordionHeader className="filters-title filters-title-sidebar" accordionName="Sorting" />);
                            } else {
                                return (<AccordionHeader className="filters-title" accordionName="Sorting" />);
                            }
                        })()}
                    </div>
                    <div className="panel">
                        <div className={ this.props.className }>
                            <div className="treeview">
                                <div className="checkbox-section">
                                    <div className="col-6 col-12-small">
                                        <ul className="list">
                                            {(() => {
                                                const sortingName = this.props.namePrefix + "Ascending";
                                                return(
                                                    <li id="check-box" className="list-item" key={ sortingName }>
                                                        <Checkbox
                                                            id={ sortingName }
                                                            name="title"
                                                            text="Alphabetical (A-Z)"
                                                            isSelected={ this.state.sorting["title"] }
                                                            onCheckboxChange={ this.handleSortingChange } />
                                                    </li>
                                                );
                                            })()}
                                            {(() => {
                                                const sortingName = this.props.namePrefix + "Descending";
                                                return(
                                                    <li id="check-box" className="list-item" key={ sortingName }>
                                                        <Checkbox
                                                            id={ sortingName }
                                                            name="-title"
                                                            text="Alphabetical (Z-A)"
                                                            isSelected={ this.state.sorting["-title"] }
                                                            onCheckboxChange={ this.handleSortingChange } />
                                                    </li>
                                                );
                                            })()}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
	}
}

export default Accordion;
