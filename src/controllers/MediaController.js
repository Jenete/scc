// controllers/MediaController.js
import FirestoreService from './FirebaseConfig'; // Import your FirestoreService class

class MediaController {
  constructor() {
    // Initialize FirestoreService with a specific collection name, e.g., 'media'
    this.songsService = new FirestoreService('songs');
    this.documentsService = new FirestoreService('documents');
    this.linksService = new FirestoreService('links');
  }

  /**
   * Get all songs, documents, or links based on the type
   * @param {string} type - The type of media (songs, documents, links)
   */
  async getAllMedia(type) {
    try {
      let service;
      switch (type) {
        case 'songs':
          service = this.songsService;
          break;
        case 'documents':
          service = this.documentsService;
          break;
        case 'links':
          service = this.linksService;
          break;
        default:
          throw new Error('Invalid media type');
      }

      const media = await service.getAll(type);
      return { success: true, media };
    } catch (error) {
      console.error('Error fetching media:', error);
      return { success: false, message: 'Error fetching media' };
    }
  }

  /**
   * Add a new song to the collection
   * @param {Object} song - The song data (title, lyrics, file)
   */
  async addSong(song) {
    try {
      const response = await this.songsService.addSong(song);
      return response;
    } catch (error) {
      console.error('Error adding song:', error);
      return { success: false, message: 'Error adding song' };
    }
  }

  /**
   * Add a new document to the collection
   * @param {string} title - The title of the document
   * @param {File} file - The file to be uploaded
   */
  async addDocument(title, file) {
    try {
      const response = await this.documentsService.addDocument(title, file);
      return response;
    } catch (error) {
      console.error('Error adding document:', error);
      return { success: false, message: 'Error adding document' };
    }
  }

  /**
   * Add a new link to the collection
   * @param {string} title - The title of the link
   * @param {string} url - The URL of the link
   */
  async addLink(title, url) {
    try {
      const response = await this.linksService.addLink(title, url);
      return response;
    } catch (error) {
      console.error('Error adding link:', error);
      return { success: false, message: 'Error adding link' };
    }
  }

  /**
   * Delete a media item (song, document, or link) by its ID
   * @param {string} type - The type of media (songs, documents, links)
   * @param {string} id - The ID of the media to delete
   */
  async deleteMedia(type, id) {
    try {
      let service;
      switch (type) {
        case 'songs':
          service = this.songsService;
          break;
        case 'documents':
          service = this.documentsService;
          break;
        case 'links':
          service = this.linksService;
          break;
        default:
          throw new Error('Invalid media type');
      }

      const response = await service.deleteById(id);
      return response;
    } catch (error) {
      console.error('Error deleting media:', error);
      return { success: false, message: 'Error deleting media' };
    }
  }

  /**
   * Update a media item (song, document, or link) by its ID
   * @param {string} type - The type of media (songs, documents, links)
   * @param {string} id - The ID of the media to update
   * @param {Object} data - The updated data
   */
  async updateMedia(type, id, data) {
    try {
      let service;
      switch (type) {
        case 'songs':
          service = this.songsService;
          break;
        case 'documents':
          service = this.documentsService;
          break;
        case 'links':
          service = this.linksService;
          break;
        default:
          throw new Error('Invalid media type');
      }

      const response = await service.update(id, data);
      return response;
    } catch (error) {
      console.error('Error updating media:', error);
      return { success: false, message: 'Error updating media' };
    }
  }
}

export default MediaController;
