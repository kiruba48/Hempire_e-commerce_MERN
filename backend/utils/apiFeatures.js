import circularJSON from 'circular-json';

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Extracting Query
    const queryObj = { ...this.queryString }; //need the query object untouched so we create a new temp object.
    const excludedFiles = ['page', 'sort', 'limit', 'fields'];
    excludedFiles.forEach((element) => {
      delete queryObj[element];
    });

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    // this.query = this.query.find(queryObj);
    return this;
  }
}

export default ApiFeatures;
