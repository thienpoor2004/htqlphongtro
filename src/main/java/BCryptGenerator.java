import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String newPassword = "Thien1@123"; // Thay bằng mật khẩu bạn muốn đặt
        String encodedPassword = encoder.encode(newPassword);
        System.out.println("New Hashed Password: " + encodedPassword);
    }
}
