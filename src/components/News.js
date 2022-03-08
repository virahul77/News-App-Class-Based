import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import LoadingBar from 'react-top-loading-bar'

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loding: false,
      page: 1,
      totalResults: 0
    };
    document.title = `News Monkey-${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d62dd5394b74c54a2e30a4c396507ae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loding: true });
    let data = await fetch(url);
    this.props.setProgress(50)
    let parsedData = await data.json();
    this.props.setProgress(75)
    this.setState({ loding: false });
    // console.log(parsedData);
    this.setState({ article: parsedData.articles,
                totalResults :parsedData.totalResults
    });
    this.props.setProgress(100)
  }

  //componentDidMount run after render
  async componentDidMount() {
    this.props.setProgress(15)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d62dd5394b74c54a2e30a4c396507ae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loding: true });
    let data = await fetch(url);
    this.props.setProgress(35)
    let parsedData = await data.json();
    this.setState({ loding: false });
    // console.log(parsedData);
    this.props.setProgress(100)
    this.setState({ article: parsedData.articles });
  }
  fetchMoreData = async () => {
    this.setState({page : this.state.page +1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d62dd5394b74c54a2e30a4c396507ae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loding: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // this.setState({ loding: false });
    // console.log(parsedData);
    this.setState({ article:this.state.article.concat(parsedData.articles),
                totalResults :parsedData.totalResults
    });
  };
  render() {
    // console.log('render fn');
    return (
      <>
        <h1 className="text-center mb-3" style={{marginTop:'65px'}}>
          NewsMonkey-Top Headlines-
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loding && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.article.map((element) => {
              return (
                <div className="col-md-4 mb-2" style={{marginTop:'10px'}} key={element.url}>
                  <NewItem
                    title={element.title ? element.title : ""}
                    newsUrl={element.url}
                    description={element.description ? element.description : ""}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://images.livemint.com/img/2022/02/20/600x338/Realme_9_Pro_Plus_1645342609281_1645342609472.jpeg"
                    }
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
        </div>
      </>
    );
  }
}

export default News;
