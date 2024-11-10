import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import axios from 'axios';
import debounce from 'lodash/debounce';

function Search() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  console.log('USERS', users)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query, pageNum) => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://127.0.0.1:5000/api/search-users`, {
          params: {
            query: query,
            page: pageNum,
            per_page: 20
          }
        });

        if (pageNum === 1) {
          setUsers(response.data.users);
        } else {
          setUsers(prev => [...prev, ...response.data.users]);
        }

        setHasMore(response.data.has_next);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  // Handle search input change
  const handleSearch = (text) => {
    setSearchQuery(text);
    setPage(1);
    debouncedSearch(text, 1);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setPage(1);
    debouncedSearch('', 1);
  };

  // Load more data when reaching end of list
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      debouncedSearch(searchQuery, nextPage);
    }
  };

  // Initial load
  useEffect(() => {
    debouncedSearch('', 1);
  }, []);

  return (
    <View style={{height: hp(100), width: wp(100), backgroundColor: 'black'}}>
      <View style={{height: hp(10.72), width: '100%', justifyContent: 'flex-end', alignItems: 'center', borderWidth: 1}}>
        <View style={{height: 40, width: '90%', borderRadius: 20, backgroundColor: '#413F42', flexDirection: 'row', shadowOffset: {width: 0, height: 0}, shadowRadius: 5, shadowOpacity: 1, shadowColor: 'white'}}>
          <View style={{width: '10%', justifyContent: 'center', alignItems: 'flex-end'}}>
            <FontAwesomeIcon icon={faSearch} size={20} color="white"/>
          </View>
          <TextInput
            style={{height: 40, width: '80%', borderRadius: 20, paddingLeft: '5%', color: 'white'}}
            placeholder="Search"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery ? (
            <View style={{width: '10%', justifyContent: 'center', alignItems: 'flex-start'}}>
              <FontAwesomeIcon 
                icon={faXmark} 
                size={20} 
                color="white"
                onPress={clearSearch}
              />
            </View>
          ) : null}
        </View>
      </View>
      
      <View style={{height: hp(89.2), width: wp(100), paddingTop: '3%'}}>
        <FlashList 
          data={users}
          renderItem={({ item }) => (
            <View style={{height: 100, width: '100%', flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: 'white', justifyContent: 'center', alignItems: 'center', paddingLeft: '5%'}}>
              <View style={{height: 70, width: 70, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white', borderRadius: 100}}>
                <Image
                  style={{height: 70, width: 70, borderRadius: 100}}
                  source={{ uri: item.bitmoji_url }}
                  resizeMode="contain"
                />
              </View>
              <View style={{height: 100, width: '80%', justifyContent: 'center', paddingLeft: '3%'}}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 500}}>{item.username}</Text>
                <Text style={{color: 'gray', fontSize: 15, fontWeight: 500}}>{item.email}</Text>
              </View>
            </View>
          )}
          estimatedItemSize={100}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            loading ? (
              <View style={{padding: 20}}>
                <Text style={{color: 'white', textAlign: 'center'}}>Loading...</Text>
              </View>
            ) : null
          )}
          ListEmptyComponent={() => (
            <View style={{padding: 20}}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                {error ? 'Error loading users' : 'No users found'}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default Search;