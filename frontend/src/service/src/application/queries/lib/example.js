import manageRequest from '@/domain/manageRequest';

const exampleUseCases = {
  example: (signal, values, token) => {
    
    return manageRequest(
      signal,
      'exampleQuery',
      values,
      'query',
      'normal',
      'get',
      token,
      undefined,
    );
  },
};

export default exampleUseCases;
