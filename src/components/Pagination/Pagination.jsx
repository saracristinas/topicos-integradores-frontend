import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ currentPage, totalPages, totalElements, pageSize, onPageChange }) {
  // Se houver apenas uma página, não mostra paginação
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  const maxPagesToShow = 5; // Mostra no máximo 5 botões de página

  // Calcula quais números de página mostrar
  let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow);

  if (endPage - startPage < maxPagesToShow) {
    startPage = Math.max(0, endPage - maxPagesToShow);
  }

  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const startRecord = currentPage * pageSize + 1;
  const endRecord = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        Mostrando <span className={styles.highlight}>{startRecord}</span> a{' '}
        <span className={styles.highlight}>{endRecord}</span> de{' '}
        <span className={styles.highlight}>{totalElements}</span> registros
      </div>

      <div className={styles.paginationControls}>
        {/* Botão Anterior */}
        <button
          className={`${styles.paginationBtn} ${currentPage === 0 ? styles.disabled : ''}`}
          onClick={handlePrevious}
          disabled={currentPage === 0}
          title="Página anterior"
        >
          ← Anterior
        </button>

        {/* Mostrar ... antes se necessário */}
        {startPage > 0 && (
          <>
            <button
              className={styles.paginationBtn}
              onClick={() => onPageChange(0)}
              title="Ir para primeira página"
            >
              1
            </button>
            {startPage > 1 && <span className={styles.ellipsis}>...</span>}
          </>
        )}

        {/* Botões de página */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            className={`${styles.paginationBtn} ${pageNum === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(pageNum)}
            title={`Ir para página ${pageNum + 1}`}
          >
            {pageNum + 1}
          </button>
        ))}

        {/* Mostrar ... depois se necessário */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className={styles.ellipsis}>...</span>}
            <button
              className={styles.paginationBtn}
              onClick={() => onPageChange(totalPages - 1)}
              title="Ir para última página"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Botão Próximo */}
        <button
          className={`${styles.paginationBtn} ${currentPage === totalPages - 1 ? styles.disabled : ''}`}
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          title="Próxima página"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
