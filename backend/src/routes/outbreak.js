// Outbreak alerts notification service
const express = require('express');
const router = express.Router();

// Mock outbreak data - in real implementation, this would come from health authorities API
const outbreakData = [
    {
        id: 1,
        title: 'Eczema Outbreak in Metropolitan Area',
        location: 'New York, NY',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        severity: 'high',
        description: 'Increased cases of atopic dermatitis reported in urban areas, possibly linked to air quality and seasonal allergens. Residents are advised to take preventive measures.',
        cases: 156,
        trend: 'increasing',
        affectedPopulation: '15,000+',
        lastUpdated: new Date().toISOString(),
        distance: '2.3 km',
        riskFactors: ['Air Quality', 'Seasonal Allergens', 'Urban Environment'],
        recommendations: [
            'Use hypoallergenic skincare products',
            'Avoid prolonged outdoor exposure during high pollution days',
            'Maintain proper skin hydration',
            'Consult dermatologist if symptoms persist'
        ],
        emergencyContacts: {
            healthDept: '+1-555-HEALTH',
            emergency: '911',
            nonEmergency: '311'
        }
    },
    {
        id: 2,
        title: 'Psoriasis Cases Rising in Suburban Areas',
        location: 'Los Angeles, CA',
        coordinates: { lat: 34.0522, lng: -118.2437 },
        severity: 'medium',
        description: 'Stress-related psoriasis flare-ups increasing in the region due to economic factors and lifestyle changes. Healthcare facilities are prepared.',
        cases: 89,
        trend: 'stable',
        affectedPopulation: '8,900+',
        lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        distance: '12.7 km',
        riskFactors: ['Stress', 'Economic Factors', 'Lifestyle Changes'],
        recommendations: [
            'Practice stress management techniques',
            'Maintain regular sleep schedule',
            'Follow prescribed treatment regimen',
            'Join support groups'
        ],
        emergencyContacts: {
            healthDept: '+1-555-HEALTH',
            emergency: '911',
            nonEmergency: '311'
        }
    },
    {
        id: 3,
        title: 'Contact Dermatitis Alert - Seasonal',
        location: 'Chicago, IL',
        coordinates: { lat: 41.8781, lng: -87.6298 },
        severity: 'low',
        description: 'Seasonal allergic contact dermatitis cases within normal range. No immediate action required, but monitoring continues.',
        cases: 23,
        trend: 'decreasing',
        affectedPopulation: '2,300+',
        lastUpdated: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        distance: '45.2 km',
        riskFactors: ['Seasonal Allergens', 'Plant Pollens'],
        recommendations: [
            'Identify and avoid allergen triggers',
            'Use barrier creams when outdoors',
            'Wash hands frequently',
            'Keep windows closed during high pollen days'
        ],
        emergencyContacts: {
            healthDept: '+1-555-HEALTH',
            emergency: '911',
            nonEmergency: '311'
        }
    },
    {
        id: 4,
        title: 'Fungal Skin Infections - Swimming Facilities',
        location: 'Miami, FL',
        coordinates: { lat: 25.7617, lng: -80.1918 },
        severity: 'medium',
        description: 'Increase in fungal skin infections traced to public swimming facilities. Enhanced cleaning protocols have been implemented.',
        cases: 67,
        trend: 'increasing',
        affectedPopulation: '6,700+',
        lastUpdated: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        distance: '8.9 km',
        riskFactors: ['Public Pools', 'Humidity', 'Poor Hygiene'],
        recommendations: [
            'Shower immediately after swimming',
            'Use antifungal foot powder',
            'Wear flip-flops in public areas',
            'Keep feet dry and clean'
        ],
        emergencyContacts: {
            healthDept: '+1-555-HEALTH',
            emergency: '911',
            nonEmergency: '311'
        }
    }
];

// Statistics calculation
function calculateStats() {
    const totalCases = outbreakData.reduce((sum, alert) => sum + alert.cases, 0);
    const highRiskCount = outbreakData.filter(alert => alert.severity === 'high').length;
    const affectedAreas = outbreakData.length * 2; // Approximate affected areas
    
    let riskLevel = 'Low';
    if (highRiskCount > 0) {
        riskLevel = 'High';
    } else if (outbreakData.filter(alert => alert.severity === 'medium').length > 1) {
        riskLevel = 'Medium';
    }

    return {
        activeAlerts: outbreakData.length,
        affectedAreas,
        totalCases,
        riskLevel,
        highRiskAlerts: highRiskCount,
        lastUpdated: new Date().toISOString()
    };
}

// Get all outbreak alerts with statistics
router.get('/outbreak-stats', (req, res) => {
    try {
        const stats = calculateStats();
        
        res.json({
            success: true,
            stats,
            outbreaks: outbreakData,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching outbreak stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch outbreak statistics'
        });
    }
});

// Get filtered outbreak alerts
router.get('/outbreaks', (req, res) => {
    try {
        const { severity, location, radius } = req.query;
        let filtered = [...outbreakData];

        // Filter by severity
        if (severity && severity !== 'all') {
            filtered = filtered.filter(alert => alert.severity === severity);
        }

        // Filter by location radius (mock implementation)
        if (location && radius) {
            // In real implementation, this would use geolocation calculations
            filtered = filtered.filter(alert => {
                const distance = parseFloat(alert.distance);
                return distance <= parseFloat(radius);
            });
        }

        res.json({
            success: true,
            outbreaks: filtered,
            count: filtered.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching outbreaks:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch outbreaks'
        });
    }
});

// Get specific outbreak details
router.get('/outbreaks/:id', (req, res) => {
    try {
        const outbreak = outbreakData.find(alert => alert.id === parseInt(req.params.id));
        
        if (!outbreak) {
            return res.status(404).json({
                success: false,
                error: 'Outbreak not found'
            });
        }

        res.json({
            success: true,
            outbreak,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error fetching outbreak details:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch outbreak details'
        });
    }
});

// Report new case
router.post('/report-case', (req, res) => {
    try {
        const { outbreakId, location, description, contactInfo } = req.body;
        
        // In real implementation, this would:
        // 1. Validate the report
        // 2. Store in database
        // 3. Notify health authorities
        // 4. Update outbreak statistics
        
        console.log('New case reported:', {
            outbreakId,
            location,
            description,
            timestamp: new Date().toISOString()
        });

        // Update case count (mock)
        if (outbreakId) {
            const outbreak = outbreakData.find(alert => alert.id === parseInt(outbreakId));
            if (outbreak) {
                outbreak.cases += 1;
                outbreak.lastUpdated = new Date().toISOString();
            }
        }

        res.json({
            success: true,
            message: 'Case report submitted successfully',
            reportId: `RPT-${Date.now()}`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error reporting case:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit case report'
        });
    }
});

// Subscribe to outbreak notifications
router.post('/subscribe-notifications', (req, res) => {
    try {
        const { 
            userId, 
            preferences, 
            location, 
            notificationMethods 
        } = req.body;

        // In real implementation, this would:
        // 1. Store user preferences in database
        // 2. Set up notification triggers
        // 3. Integrate with push notification services
        
        console.log('Notification subscription:', {
            userId,
            preferences,
            location,
            notificationMethods,
            timestamp: new Date().toISOString()
        });

        res.json({
            success: true,
            message: 'Notification preferences updated',
            subscriptionId: `SUB-${Date.now()}`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error subscribing to notifications:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update notification preferences'
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'online',
        service: 'outbreak-alerts',
        timestamp: new Date().toISOString()
    });
});

// Simulate real-time outbreak updates (for demo)
function simulateOutbreakUpdates() {
    setInterval(() => {
        // Randomly update case counts and trends
        outbreakData.forEach(outbreak => {
            if (Math.random() > 0.7) { // 30% chance of update
                const change = Math.floor(Math.random() * 5) + 1;
                outbreak.cases += change;
                outbreak.lastUpdated = new Date().toISOString();
                
                // Update trend based on change
                if (change > 3) {
                    outbreak.trend = 'increasing';
                } else if (change < 2) {
                    outbreak.trend = 'stable';
                }
            }
        });
    }, 300000); // Update every 5 minutes
}

// Start simulation
simulateOutbreakUpdates();

module.exports = router;
