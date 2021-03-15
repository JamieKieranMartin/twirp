import { createTwirpRequest, throwTwirpError, Fetch } from "./twirp";

export interface Parameters {
  x: number;
  y: number;
}

interface ParametersJSON {
  x: number;
  y: number;
}

const ParametersToJSON = (m: Parameters): ParametersJSON => {
  return {
    x: m.x,
    y: m.y,
  };
};

export interface Result {
  z: number;
}

interface ResultJSON {
  z: number;
}

const JSONToResult = (m: Result | ResultJSON): Result => {
  return {
    z: m.z,
  };
};

export interface Math {
  add: (parameters: Parameters) => Promise<Result>;

  subtract: (parameters: Parameters) => Promise<Result>;
}

export class DefaultMath implements Math {
  private hostname: string;
  private fetch: Fetch;
  private writeCamelCase: boolean;
  private pathPrefix = "/math.Math/";

  constructor(hostname: string, fetch: Fetch, writeCamelCase = false) {
    this.hostname = hostname;
    this.fetch = fetch;
    this.writeCamelCase = writeCamelCase;
  }
  add(parameters: Parameters): Promise<Result> {
    const url = this.hostname + this.pathPrefix + "Add";
    let body: Parameters | ParametersJSON = parameters;
    if (!this.writeCamelCase) {
      body = ParametersToJSON(parameters);
    }
    return this.fetch(createTwirpRequest(url, body)).then((resp) => {
      if (!resp.ok) {
        return throwTwirpError(resp);
      }

      return resp.json().then(JSONToResult);
    });
  }

  subtract(parameters: Parameters): Promise<Result> {
    const url = this.hostname + this.pathPrefix + "Subtract";
    let body: Parameters | ParametersJSON = parameters;
    if (!this.writeCamelCase) {
      body = ParametersToJSON(parameters);
    }
    return this.fetch(createTwirpRequest(url, body)).then((resp) => {
      if (!resp.ok) {
        return throwTwirpError(resp);
      }

      return resp.json().then(JSONToResult);
    });
  }
}
