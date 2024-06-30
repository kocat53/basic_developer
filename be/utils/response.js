/**
 * 성공 반환 함수
 * @param {Response} res
 * @param {Object} data
 * @param {String} message
 * @returns {Object}
 */
export const successResponse = (res, message, data = []) => {
  return res.status(200).json({
    message,
    data,
  });
};

/**
 * 에러반환 함수
 * @param {Object} res
 * @param {number} code 반환코드
 * @param {Array|Object} [data=[]] 반환데이터
 * @param {string} message 메시지
 * @param {string} errCode 에러코드
 * @param {Error} [error=null] 에러
 * @returns {Object}
 */
export const errorResponse = (
  res,
  code,
  message,
  data = [],
  errCode,
  error = null
) => {
  return res.status(code).json({
    message,
    data,
    errorCode,
    error: error ? error.message : undefined,
  });
};
