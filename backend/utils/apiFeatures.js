import circularJSON from 'circular-json';

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.keyword;
    this.page;
    this.limit;
    this.section;
  }

  filter() {
    // Extracting Query
    const queryObj = { ...this.queryString }; //need the query object untouched so we create a new temp object.
    const excludedFiles = ['page', 'sort', 'limit', 'fields', 'keyword'];
    excludedFiles.forEach((element) => {
      delete queryObj[element];
    });

    this.section = this.queryString.sex && this.queryString.sex;

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    // this.query = this.query.find(queryObj);
    return this;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: 'i',
          },
        }
      : {};
    this.keyword = keyword;
    this.query = this.query.find({ ...keyword });
    return this;
  }

  pagination() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 5;
    const skip = (page - 1) * limit;

    this.page = page;
    this.limit = limit;

    this.query = this.query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const totalDocs = await Class.countDocuments();
    //   if (skip >= totalDocs)
    //     throw new Error('This page does not exists');
    // }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort({ sortBy: -1 }).limit(3);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }
}

export default ApiFeatures;
