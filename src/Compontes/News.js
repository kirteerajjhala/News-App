import React, { Component } from 'react';
import NavItem from './NewIteam';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingBar from 'react-top-loading-bar';

export default class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general"
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

  progressRef = React.createRef();

  capitalize = (s1) => {
    return s1.charAt(0).toUpperCase() + s1.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalize(this.props.category)} - NewMonkey`;
  }

  async componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    this.progressRef.current.continuousStart();
    this.setState({ loading: true });
    try {
      const { country, category, pageSize } = this.props;
      const { page } = this.state;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e7ab0b03861640cc861017c5c837fb4b&page=${page}&pageSize=${pageSize}`;
      console.log("Fetching URL:", url);  // Debug line
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log("API Response:", parsedData);  // Debug line
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false
      });
      this.progressRef.current.complete();
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
      this.progressRef.current.complete();
    }
  };

  fetchMoreData = async () => {
    this.progressRef.current.continuousStart();
    const nextPage = this.state.page + 1;
    try {
      const { country, category, pageSize } = this.props;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e7ab0b03861640cc861017c5c837fb4b&page=${nextPage}&pageSize=${pageSize}`;
      console.log("Fetching more URL:", url);  // Debug line
      const data = await fetch(url);
      const parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        page: nextPage,
        totalResults: parsedData.totalResults
      });
      this.progressRef.current.complete();
    } catch (error) {
      console.error("Error fetching more news:", error);
      this.progressRef.current.complete();
    }
  };

  render() {
    return (
      <>
        <LoadingBar color='#f11946' ref={this.progressRef} height={3} />
        <h1 className='text-center my-4'>
          NewMonkey - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
          style={{ overflow: "visible" }}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                if (!element.title || !element.urlToImage || !element.url) return null;
                return (
                  <div className="col-md-4" key={element.url}>
                    <NavItem
                      title={element.title}
                      description={element.description}
                      imageURL={element.urlToImage}
                      newURl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
