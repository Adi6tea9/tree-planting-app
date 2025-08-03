import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Phone, Globe, Filter } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface Nursery {
  id: string;
  name: string;
  type: 'wholesale' | 'retail';
  address: string;
  distance: number;
  phone: string;
  website: string;
  coordinates: [number, number];
}

const NurseryLocator: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'wholesale' | 'retail'>('all');
  const [searchLocation, setSearchLocation] = useState('');

  const nurseries: Nursery[] = [
    {
      id: '1',
      name: 'Delhi Garden Centre',
      type: 'retail',
      address: 'Sector 18, Noida, Uttar Pradesh 201301',
      distance: 2.3,
      phone: '+91 120 4567890',
      website: 'delhigarden.com',
      coordinates: [28.5706, 77.3272]
    },
    {
      id: '2',
      name: 'Mumbai Plant Wholesale',
      type: 'wholesale',
      address: 'Andheri East, Mumbai, Maharashtra 400069',
      distance: 5.7,
      phone: '+91 22 2847 5630',
      website: 'mumbaiplantwholesale.com',
      coordinates: [19.1136, 72.8697]
    },
    {
      id: '3',
      name: 'Bangalore Green Nursery',
      type: 'retail',
      address: 'Koramangala, Bangalore, Karnataka 560034',
      distance: 8.1,
      phone: '+91 80 4112 3456',
      website: 'bangaloregreen.com',
      coordinates: [12.9279, 77.6271]
    },
    {
      id: '4',
      name: 'Chennai Flora Centre',
      type: 'retail',
      address: 'T. Nagar, Chennai, Tamil Nadu 600017',
      distance: 12.5,
      phone: '+91 44 2434 5678',
      website: 'chennaifloracentre.com',
      coordinates: [13.0418, 80.2341]
    },
    {
      id: '5',
      name: 'Pune Plant Paradise',
      type: 'wholesale',
      address: 'Kothrud, Pune, Maharashtra 411038',
      distance: 15.2,
      phone: '+91 20 2543 7890',
      website: 'puneplantparadise.com',
      coordinates: [18.5074, 73.8077]
    },
    {
      id: '6',
      name: 'Hyderabad Herbal Hub',
      type: 'retail',
      address: 'Banjara Hills, Hyderabad, Telangana 500034',
      distance: 18.7,
      phone: '+91 40 2335 6789',
      website: 'hyderabadherbalhub.com',
      coordinates: [17.4065, 78.4772]
    },
    {
      id: '7',
      name: 'Kolkata Garden Supplies',
      type: 'wholesale',
      address: 'Salt Lake, Kolkata, West Bengal 700064',
      distance: 22.1,
      phone: '+91 33 2357 4680',
      website: 'kolkatagardensupplies.com',
      coordinates: [22.5726, 88.3639]
    },
    {
      id: '8',
      name: 'Jaipur Plant Emporium',
      type: 'retail',
      address: 'Malviya Nagar, Jaipur, Rajasthan 302017',
      distance: 25.8,
      phone: '+91 141 2678 9012',
      website: 'jaipurplantemporium.com',
      coordinates: [26.8543, 75.8252]
    }
  ];

  const filteredNurseries = nurseries.filter(nursery => 
    filter === 'all' || nursery.type === filter
  );

  return (
    <section className="nursery-locator">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <MapPin className="section-icon" />
            Find Nearby Nurseries
          </h2>
          <p className="section-description">
            Discover local nurseries to get your plants and planting supplies.
          </p>
        </div>

        <div className="search-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter your location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="location-input"
            />
            <button className="search-button">Search</button>
          </div>
          
          <div className="filter-controls">
            <Filter className="filter-icon" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as 'all' | 'wholesale' | 'retail')}
              className="filter-select"
            >
              <option value="all">All Nurseries</option>
              <option value="wholesale">Wholesale Only</option>
              <option value="retail">Retail Only</option>
            </select>
          </div>
        </div>

        <div className="locator-content">
          <div className="map-section">
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              className="nursery-map"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredNurseries.map((nursery) => (
                <Marker key={nursery.id} position={nursery.coordinates}>
                  <Popup>
                    <div className="map-popup">
                      <h3>{nursery.name}</h3>
                      <p>{nursery.address}</p>
                      <span className={`nursery-type ${nursery.type}`}>
                        {nursery.type}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="nursery-list">
            <h3 className="list-title">Nearby Nurseries ({filteredNurseries.length})</h3>
            
            {filteredNurseries.map((nursery) => (
              <div key={nursery.id} className="nursery-card">
                <div className="nursery-header">
                  <h4 className="nursery-name">{nursery.name}</h4>
                  <span className={`nursery-badge ${nursery.type}`}>
                    {nursery.type}
                  </span>
                </div>
                
                <div className="nursery-details">
                  <div className="detail-item">
                    <MapPin className="detail-icon" />
                    <span className="detail-text">{nursery.address}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="distance">{nursery.distance} km away</span>
                  </div>
                  
                  <div className="detail-item">
                    <Phone className="detail-icon" />
                    <span className="detail-text">{nursery.phone}</span>
                  </div>
                  
                  <div className="detail-item">
                    <Globe className="detail-icon" />
                    <a 
                      href={`https://${nursery.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="detail-link"
                    >
                      {nursery.website}
                    </a>
                  </div>
                </div>
                
                <div className="nursery-actions">
                  <button className="get-directions-btn">Get Directions</button>
                  <button className="call-btn">
                    <Phone className="btn-icon" />
                    Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NurseryLocator;
