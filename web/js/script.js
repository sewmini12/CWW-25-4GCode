// Global variables
let currentFile = null;
const API_BASE_URL = 'http://localhost:5001';

// DOM elements
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const analysisResult = document.getElementById('analysis-result');
const loading = document.getElementById('loading');
const uploadedPreview = document.getElementById('uploaded-preview');
const conditionName = document.getElementById('condition-name');
const confidence = document.getElementById('confidence');
const treatmentList = document.getElementById('treatment-list');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    checkAIServiceStatus();
});

// Initialize event listeners
function initializeEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
}

// Prevent default drag behaviors
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Handle drag over
function handleDragOver(e) {
    uploadArea.classList.add('dragover');
}

// Handle drag leave
function handleDragLeave(e) {
    uploadArea.classList.remove('dragover');
}

// Handle drop
function handleDrop(e) {
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// Handle file selection
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// Handle file processing
function handleFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file (PNG, JPG, JPEG, GIF)');
        return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showError('File size must be less than 10MB');
        return;
    }
    
    currentFile = file;
    analyzeImage(file);
}

// Analyze image
async function analyzeImage(file) {
    try {
        // Show loading
        showLoading();
        
        // Create preview
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        // Prepare form data
        const formData = new FormData();
        formData.append('image', file);
        
        // Send to AI service
        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Display results
        displayResults(result);
        
    } catch (error) {
        console.error('Analysis error:', error);
        hideLoading();
        
        if (error.message.includes('Failed to fetch')) {
            showError('Unable to connect to AI service. Please make sure the AI service is running on port 5001.');
        } else {
            showError('An error occurred during analysis. Please try again.');
        }
    }
}

// Display analysis results
function displayResults(result) {
    hideLoading();
    
    // Update condition information
    conditionName.textContent = result.condition || 'Unknown';
    confidence.textContent = `Confidence: ${Math.round((result.confidence || 0) * 100)}%`;
    
    // Update treatment suggestions
    treatmentList.innerHTML = '';
    if (result.treatments && result.treatments.length > 0) {
        result.treatments.forEach(treatment => {
            const li = document.createElement('li');
            li.textContent = treatment;
            treatmentList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Please consult a healthcare professional for proper treatment advice.';
        treatmentList.appendChild(li);
    }
    
    // Show results
    uploadArea.style.display = 'none';
    analysisResult.style.display = 'block';
}

// Show loading state
function showLoading() {
    uploadArea.style.display = 'none';
    analysisResult.style.display = 'none';
    loading.style.display = 'block';
}

// Hide loading state
function hideLoading() {
    loading.style.display = 'none';
}

// Reset analysis
function resetAnalysis() {
    currentFile = null;
    fileInput.value = '';
    uploadArea.style.display = 'block';
    analysisResult.style.display = 'none';
    loading.style.display = 'none';
    uploadedPreview.src = '';
}

// Show error message
function showError(message) {
    hideLoading();
    alert(`Error: ${message}`);
}

// Smooth scroll to analyze section
function scrollToAnalyze() {
    document.getElementById('analyze').scrollIntoView({
        behavior: 'smooth'
    });
}

// Check AI service status
async function checkAIServiceStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            timeout: 5000
        });
        
        if (response.ok) {
            console.log('✅ AI Service is running');
            showServiceStatus('AI Service Connected', 'success');
        } else {
            throw new Error('Service not responding');
        }
    } catch (error) {
        console.warn('⚠️ AI Service not available:', error.message);
        showServiceStatus('AI Service Offline - Please start the Python service', 'warning');
    }
}

// Show service status
function showServiceStatus(message, type) {
    // Create status indicator
    const statusDiv = document.createElement('div');
    statusDiv.className = `service-status ${type}`;
    statusDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    statusDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#ed8936'};
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        z-index: 1001;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(statusDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusDiv.style.opacity = '0';
        statusDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.parentNode.removeChild(statusDiv);
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some sample data for testing when AI service is not available
const mockAnalysisResult = {
    condition: "Acne",
    confidence: 0.85,
    treatments: [
        "Keep the affected area clean and dry",
        "Use non-comedogenic skincare products",
        "Apply topical treatments containing benzoyl peroxide or salicylic acid",
        "Avoid picking or squeezing acne lesions",
        "Consider consulting a dermatologist for persistent cases"
    ]
};

// Use mock data if AI service is not available
function useMockAnalysis(file) {
    showLoading();
    
    // Create preview
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
    
    // Simulate analysis delay
    setTimeout(() => {
        displayResults(mockAnalysisResult);
        showServiceStatus('Using mock analysis - AI service not available', 'warning');
    }, 2000);
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});
