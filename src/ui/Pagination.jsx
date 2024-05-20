// eslint-disable-next-line no-unused-vars
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const PageCount = Number(Math.ceil(count / PAGE_SIZE));

  function nextPage() {
    if (currentPage >= PageCount) return;

    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }

  function pervPage() {
    if (currentPage <= 1) return;

    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  }
  return (
    <StyledPagination>
      <P>
        showing <span> {(currentPage - 1) * PAGE_SIZE + 1} </span> to
        <span>
          {currentPage === PageCount ? count : PAGE_SIZE * currentPage}
        </span>
        from
        <span> {count} </span> resualt
      </P>

      {PageCount > 1 && (
        <Buttons>
          <PaginationButton onClick={pervPage} disabled={currentPage <= 1}>
            <HiChevronLeft />
            <span> Perviose </span>
          </PaginationButton>

          <PaginationButton
            onClick={nextPage}
            disabled={currentPage >= PageCount}
          >
            <span> next </span>
            <HiChevronRight />
          </PaginationButton>
        </Buttons>
      )}
    </StyledPagination>
  );
}
