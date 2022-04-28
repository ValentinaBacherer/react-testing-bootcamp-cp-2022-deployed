import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Home from './Home';
import userEvent from '@testing-library/user-event';

describe('Home component tests', () => {
  it('should show the Picture of the Day, when the user enters the app', async () => {
    render(<Home />);
    const picture = await screen.findByRole('img');
    expect(picture).toBeInTheDocument();
  });

  it('should show the picture of the day for the given date, when the user selects a specific date with the format YYYY-MM-DD', async () => {
    render(<Home />);
    const dateSelectorEl = screen.getByLabelText(/date/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(dateSelectorEl, '2022-04-27');
    });

    const pictureDate = await screen.findByText(/2022-04-27/i);
    expect(pictureDate).toBeInTheDocument();
  });

  it.skip('Should show a message: "There was an error, please try again", when the app fetches the API, and there is an unexpected error.', async () => {
    render(<Home />);

    // for this test to pass, please activate network error in handler by uncommenting line 21
    const errorMessage = await screen.findByText(
      /there was an error, please try again/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should show a message from the API response (e.g., a day after the current date.), when the user selects an invalid date value and clicks on the show button', async () => {
    render(<Home />);
    const dateSelectorEl = screen.getByLabelText(/date/i);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.type(dateSelectorEl, '1900-04-27');
    });
    const errorMessage = await screen.findByText(
      /date must be between Jun 16, 1995 and Apr 28, 2022/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render correctly the header, footer and main content in the app.', () => {
    render(<Home />);
    const header = screen.getByText(/nasa picture project/i);
    expect(header).toBeInTheDocument();

    const footer = screen.getByText(
      /project created during Wizeline Academy React Testing Bootcamp/i
    );
    expect(footer).toBeInTheDocument();

    const main = screen.getByTestId(/main-content/i);
    expect(main).toBeInTheDocument();
  });
});
