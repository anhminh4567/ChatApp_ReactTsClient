const ALLOWED_STRING = "qwertyuiopasdfghjklzxcvbnm";
const ALLOWED_NUM = "1234567890";
export type IdGenOptions = {
  length: number;
  hasNumber: boolean;
};

const defaultOpt: IdGenOptions = {
  hasNumber: true,
  length: 10,
};
function create(options?: IdGenOptions) {
  options = {
    ...defaultOpt,
    ...options,
  };
  let source = ALLOWED_STRING;
  if (options.hasNumber) {
    source = source + ALLOWED_NUM;
  }
  let result = "";
  for (let i = 0; i < options.length; i++) {
    let randomNo = clamp(
      Math.floor(Math.random() * source.length),
      0,
      source.length - 1
    );
    result += source[randomNo];
  }
  return result;
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

export const IdGen = {
  create,
};
