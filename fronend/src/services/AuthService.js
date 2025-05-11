import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Đăng nhập thất bại");
  }

  const data = await response.json();
  const token = data.token;

  // ✅ Lưu token vào localStorage
  localStorage.setItem("token", token);

  // ✅ Giải mã token
  const decoded = jwtDecode(token);
  const userId = Number(decoded.id); // ✅ Đúng field chứa userId

  if (isNaN(userId)) {
    console.error("❌ decoded.id không hợp lệ:", decoded.id);
    localStorage.setItem("user", JSON.stringify(decoded));
    return data;
  }

  try {
    const tenantRes = await fetch(`http://localhost:8080/api/tenants/by-user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!tenantRes.ok) {
      const errText = await tenantRes.text();
      throw new Error("Tenant not found: " + errText);
    }

    const tenant = await tenantRes.json();

    const fullUser = {
      ...decoded,
      userId, // 👍 thêm rõ ràng
      tenantId: tenant.id,
      fullName: tenant.fullName,
      email: tenant.email,
    };

    localStorage.setItem("user", JSON.stringify(fullUser));
  } catch (err) {
    console.error("❌ Không lấy được tenant:", err.message);
    localStorage.setItem("user", JSON.stringify(decoded)); // fallback
  }

  return data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const isLoggedIn = () => !!localStorage.getItem("token");

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default {
  login,
  logout,
  isLoggedIn,
  getCurrentUser,
};
