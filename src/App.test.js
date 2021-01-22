import React from "react";
import { shallow, mount, configure } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "./App";
import Form from "./components/Form/Form";
import FormList from "./components/Form/FormList/FormList";

import { forms } from "../db.json";

configure({ adapter: new Adapter() });

const simulateOnChangeInput = (wrapper, inputSelector, newValue) => {
  const input = wrapper.find(inputSelector);
  input.simulate("change", {
    target: { value: newValue },
  });

  return wrapper.find(inputSelector);
};

describe("The components are rendered", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });

  it("renders Form component without crashing", () => {
    shallow(<Form />);
  });

  it("renders FormList component without crashing", () => {
    shallow(<FormList />);
  });

  it("renders title without crashing", () => {
    const wrapper = shallow(<App />);

    const header = <h1>Become a volunteer</h1>;
    expect(wrapper.contains(header)).toBe(true);
  });

  it("renders form inputs", () => {
    const wrapper = shallow(<Form />);

    expect(wrapper.find('input[name="volunteerName"]')).toHaveLength(1);
    expect(wrapper.find('input[name="hours"]')).toHaveLength(1);
    expect(wrapper.find('select[name="jobTitle"]')).toHaveLength(1);
  });

  it("renders submit button without crashing", () => {
    const wrapper = shallow(<Form />);

    const label = wrapper.find("#submit-button").text();
    expect(label).toBe("Submit");
  });
});

describe("FormList is passing props", () => {
  it("accepts props", () => {
    const wrapper = mount(<FormList forms={forms} />);
    expect(wrapper.props().forms).toEqual(forms);
  });

  it(`should have all properties`, () => {
    const wrapper = mount(<FormList forms={forms} />);
    const renderedForms = wrapper.props().forms;
    for (let i = 0; i < renderedForms.length; i += 1) {
      expect(renderedForms[i]).toHaveProperty("id");
      expect(renderedForms[i]).toHaveProperty("volunteerName");
      expect(renderedForms[i]).toHaveProperty("hours");
      expect(renderedForms[i]).toHaveProperty("jobTitle");
    }
  });
});

describe("The events are working ", () => {
  it("fill the form with values and then reset the form", () => {
    const wrapper = shallow(<Form />);

    const updatedNameInput = simulateOnChangeInput(
      wrapper,
      "#volunteerName-input",
      "Endzela Gaye"
    );
    const updatedHourInput = simulateOnChangeInput(
      wrapper,
      "#hours-input",
      "2"
    );
    const updatedJobTitleInput = simulateOnChangeInput(
      wrapper,
      "select",
      "Food supply"
    );

    expect(updatedJobTitleInput.props().value).toBe("Food supply");
    expect(updatedHourInput.props().value).toBe("2");
    expect(updatedNameInput.props().value).toBe("Endzela Gaye");

    wrapper.find("#reset-button").simulate("click");

    expect(wrapper.find("#volunteerName-input").props().value).toBe("");
    expect(wrapper.find("#hours-input").props().value).toBe("");
    expect(wrapper.find("#job-input").props().value).toBe("Raising funds");
  });

  it("fill the form with values and then submit the form", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<Form />);

    simulateOnChangeInput(wrapper, "#volunteerName-input", "Endzela Gaye");
    simulateOnChangeInput(wrapper, "#hours-input", "2");
    simulateOnChangeInput(wrapper, "select", "Food supply");

    const button = shallow(
      <button
        type="submit"
        id="submit-button"
        className="submit"
        onClick={mockCallBack}
      >
        Submit
      </button>
    );
    button.find("#submit-button").simulate("click", {
      preventDefault: () => {},
    });
    expect(mockCallBack).toHaveBeenCalledTimes(1);
  });
});

describe("Snapshot", () => {
  it("matches App the snapshot", () => {
    const wrapper = mount(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
