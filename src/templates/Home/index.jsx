import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filterPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    :
    posts;

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postPerPage));
    setAllPosts(postsAndPhotos)
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
  }, [handleLoadPosts, postPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPost);

    setPosts(posts);
    setPage(nextPage)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  return (
    <section className='container'>
      <div className="search-container">
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}

        <TextInput
          value={searchValue}
          handleChange={handleChange} />
      </div>

      {filterPosts.length > 0 && (
        <Posts posts={filterPosts} />
      )}

      {filterPosts.length === 0 && (
        <p>Não existem posts</p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            disabled={noMorePosts}
            onclick={loadMorePosts}
            title='Load more posts' />
        )}
      </div>
    </section>
  );
}