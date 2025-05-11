package com.htqlptro.qlphongtro.controller;

import com.htqlptro.qlphongtro.model.Room;
import com.htqlptro.qlphongtro.model.User;
import com.htqlptro.qlphongtro.repository.RoomRepository;
import com.htqlptro.qlphongtro.repository.UserRepository;
import com.htqlptro.qlphongtro.security.JwtUtil;
import com.htqlptro.qlphongtro.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createRoom(
        @RequestHeader("Authorization") String authHeader,
        @RequestParam("roomNumber") String roomNumber,
        @RequestParam("capacity") int capacity,
        @RequestParam("price") double price,
        @RequestParam("status") String status,
        @RequestParam(defaultValue = "false") boolean wifi,
        @RequestParam(defaultValue = "false") boolean ac,
        @RequestParam(defaultValue = "false") boolean hotWater,
        @RequestParam(defaultValue = "false") boolean tv,
        @RequestParam(defaultValue = "false") boolean kitchen,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "area", required = false) Double area,
        @RequestParam(value = "floor", required = false) Integer floor,
        @RequestParam(value = "location", required = false) String location,
        @RequestParam(value = "latitude", required = false) Double latitude,
        @RequestParam(value = "longitude", required = false) Double longitude,
        @RequestParam(value = "featured", defaultValue = "false") boolean featured,
        @RequestParam(value = "images", required = false) MultipartFile[] imageFiles
    ) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String username = jwtUtil.extractUsername(token);
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user"));

            Room room = new Room();
            room.setRoomNumber(roomNumber);
            room.setCapacity(capacity);
            room.setPrice(price);
            room.setStatus(status);
            room.setUser(user);
            room.setWifi(wifi);
            room.setAc(ac);
            room.setHotWater(hotWater);
            room.setTv(tv);
            room.setKitchen(kitchen);
            room.setDescription(description);
            room.setArea(area);
            room.setFloor(floor);
            room.setLocation(location);
            room.setLatitude(latitude);
            room.setLongitude(longitude);
            room.setFeatured(featured);

            List<String> fileNames = new ArrayList<>();
            if (imageFiles != null) {
                for (MultipartFile file : imageFiles) {
                    if (!file.isEmpty()) {
                        String fileName = file.getOriginalFilename();
                        Path uploadPath = Paths.get("uploads");
                        if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
                        Files.write(uploadPath.resolve(fileName), file.getBytes());
                        fileNames.add(fileName);
                    }
                }
            }
            room.setImageUrls(fileNames);

            Room savedRoom = roomService.saveRoom(room);
            return ResponseEntity.ok(savedRoom);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi lưu phòng: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Room> updateRoom(
        @PathVariable Long id,
        @RequestParam("roomNumber") String roomNumber,
        @RequestParam("capacity") int capacity,
        @RequestParam("price") double price,
        @RequestParam("status") String status,
        @RequestParam(defaultValue = "false") boolean wifi,
        @RequestParam(defaultValue = "false") boolean ac,
        @RequestParam(defaultValue = "false") boolean hotWater,
        @RequestParam(defaultValue = "false") boolean tv,
        @RequestParam(defaultValue = "false") boolean kitchen,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "area", required = false) Double area,
        @RequestParam(value = "floor", required = false) Integer floor,
        @RequestParam(value = "location", required = false) String location,
        @RequestParam(value = "latitude", required = false) Double latitude,
        @RequestParam(value = "longitude", required = false) Double longitude,
        @RequestParam(value = "featured", defaultValue = "false") boolean featured,
        @RequestParam(value = "images", required = false) MultipartFile[] imageFiles
    ) {
        return roomService.getRoomById(id)
            .map(existingRoom -> {
                existingRoom.setRoomNumber(roomNumber);
                existingRoom.setCapacity(capacity);
                existingRoom.setPrice(price);
                existingRoom.setStatus(status);
                existingRoom.setWifi(wifi);
                existingRoom.setAc(ac);
                existingRoom.setHotWater(hotWater);
                existingRoom.setTv(tv);
                existingRoom.setKitchen(kitchen);
                existingRoom.setDescription(description);
                existingRoom.setArea(area);
                existingRoom.setFloor(floor);
                existingRoom.setLocation(location);
                existingRoom.setLatitude(latitude);
                existingRoom.setLongitude(longitude);
                existingRoom.setFeatured(featured);

                if (imageFiles != null && imageFiles.length > 0) {
                    List<String> fileNames = new ArrayList<>();
                    for (MultipartFile file : imageFiles) {
                        if (!file.isEmpty()) {
                            try {
                                String fileName = file.getOriginalFilename();
                                Path uploadPath = Paths.get("uploads");
                                if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);
                                Files.write(uploadPath.resolve(fileName), file.getBytes());
                                fileNames.add(fileName);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                    existingRoom.setImageUrls(fileNames);
                }

                Room savedRoom = roomService.saveRoom(existingRoom);
                return ResponseEntity.ok(savedRoom);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/my-room")
    public ResponseEntity<?> getMyRoom(@RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            String username = jwtUtil.extractUsername(token);
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user"));

            List<Room> rooms = roomService.findByUser(user);
            return ResponseEntity.ok(rooms);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi: " + e.getMessage());
        }
    }

    @GetMapping("/public")
    public List<Room> getPublicRooms() {
        return roomRepository.findByStatus("AVAILABLE");
    }
}
