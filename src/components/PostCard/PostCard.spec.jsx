import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { PostCardPopsMock } from './mock';

const props = PostCardPopsMock;

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props} />);

    expect.assertions(3);

    expect(screen.getByAltText('title 1')).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
