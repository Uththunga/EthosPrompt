import React, { useState, useEffect } from 'react';
import { supabase, UserFavorite } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user favorites
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_favorites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFavorites(data || []);
      } catch (err: any) {
        console.error('Error loading favorites:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Check if a prompt is favorited
  const isFavorited = (promptId: string): boolean => {
    return favorites.some(fav => fav.prompt_id === promptId);
  };

  // Add a prompt to favorites
  const addToFavorites = async (promptId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to add favorites');
      return false;
    }

    if (isFavorited(promptId)) {
      toast.error('Prompt is already in your favorites');
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          prompt_id: promptId,
        })
        .select()
        .single();

      if (error) throw error;

      setFavorites(prev => [data, ...prev]);
      toast.success('Added to favorites');
      return true;
    } catch (err: any) {
      console.error('Error adding to favorites:', err);
      toast.error('Failed to add to favorites');
      return false;
    }
  };

  // Remove a prompt from favorites
  const removeFromFavorites = async (promptId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to manage favorites');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', promptId);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.prompt_id !== promptId));
      toast.success('Removed from favorites');
      return true;
    } catch (err: any) {
      console.error('Error removing from favorites:', err);
      toast.error('Failed to remove from favorites');
      return false;
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (promptId: string): Promise<boolean> => {
    if (isFavorited(promptId)) {
      return await removeFromFavorites(promptId);
    } else {
      return await addToFavorites(promptId);
    }
  };

  // Get favorite prompt IDs
  const getFavoritePromptIds = (): string[] => {
    return favorites.map(fav => fav.prompt_id);
  };

  // Get favorites count
  const getFavoritesCount = (): number => {
    return favorites.length;
  };

  // Clear all favorites
  const clearAllFavorites = async (): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to manage favorites');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setFavorites([]);
      toast.success('All favorites cleared');
      return true;
    } catch (err: any) {
      console.error('Error clearing favorites:', err);
      toast.error('Failed to clear favorites');
      return false;
    }
  };

  return {
    favorites,
    loading,
    error,
    isFavorited,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    getFavoritePromptIds,
    getFavoritesCount,
    clearAllFavorites,
  };
};
