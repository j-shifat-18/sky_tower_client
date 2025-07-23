import React from "react";

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            className={`btn btn-sm ${currentPage === page ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
