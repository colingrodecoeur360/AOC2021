import * as chai from "chai";
import * as sinon from "sinon";

export const sandbox = sinon.createSandbox();

export const expect = chai.expect;

afterEach((): void => sandbox.restore());
