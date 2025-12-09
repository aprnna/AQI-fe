// utils/fetchApi.ts
import axios, { AxiosRequestConfig } from "axios";

export default async function fetchApi(
  path: string,
  method: string,
  body?: any,
  customHeaders?: Record<string, string>
) {
  const url = process.env.NEXT_PUBLIC_API_URL + path;
  
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
  
  // Handle FormData
  if (body instanceof FormData) {
    // Jangan set Content-Type, biar browser yang handle
  } else if (body) {
    headers["Content-Type"] = "application/json";
  }
  
  if (customHeaders) {
    Object.assign(headers, customHeaders);
  }

  // Ambil CSRF token dari cookie (client-side only)
  if (typeof window !== "undefined") {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];
    
    if (token) {
      headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }
  }

  const config: AxiosRequestConfig = {
    method: method as any,
    url,
    headers,
    // withCredentials: true, // PENTING untuk cookie session!
    // timeout: 10000, // 10 second timeout
  };

  if (body) {
    config.data = body instanceof FormData ? body : JSON.stringify(body);
  }

  try {
    const response = await axios(config);

    return response.data; 
  } catch (error: any) {
    console.error("💥 Request failed:", {
      url,
      method,
      status: error.response?.status,
      data: error.response?.data,
    });

    if (error.response) {
      const serverError = error.response.data;
      
      // Handle validation errors
      if (error.response.status === 422 && serverError.errors) {
        const firstError = Object.values(serverError.errors)[0];
        
        throw new Error(Array.isArray(firstError) ? firstError[0] : firstError);
      }
      
      // Handle 419 CSRF token mismatch
      if (error.response.status === 419) {
        throw new Error('Session expired. Please refresh the page.');
      }
      
      throw new Error(
        serverError?.message || 
        serverError?.error || 
        `Server error: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error('Network error: Unable to reach server');
    } else {
      throw new Error(error.message || 'Request failed');
    }
  }
}

