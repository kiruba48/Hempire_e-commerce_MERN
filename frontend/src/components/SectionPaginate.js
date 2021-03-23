import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Pagination } from 'react-bootstrap';

const SectionPaginate = ({ pages, page, section }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1}
            to={`/section/page/${p + 1}?sex=${section}`}
          >
            <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default SectionPaginate;
