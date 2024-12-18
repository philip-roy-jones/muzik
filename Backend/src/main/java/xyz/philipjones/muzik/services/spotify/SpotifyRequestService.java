package xyz.philipjones.muzik.services.spotify;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import xyz.philipjones.muzik.repositories.UserRepository;
import xyz.philipjones.muzik.services.redis.RedisService;
import xyz.philipjones.muzik.services.security.ServerAccessTokenService;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;

@Service
public class SpotifyRequestService {

    private final UserRepository userRepository;
    private final ServerAccessTokenService serverAccessTokenService;
    private final StringEncryptor stringEncryptor;
    private final RedisService redisService;

    @Autowired
    public SpotifyRequestService(UserRepository userRepository, ServerAccessTokenService serverAccessTokenService,
                                 @Qualifier("jasyptStringEncryptor") StringEncryptor stringEncryptor, RedisService redisService) {
        this.userRepository = userRepository;
        this.serverAccessTokenService = serverAccessTokenService;
        this.stringEncryptor = stringEncryptor;
        this.redisService = redisService;
    }

    public HashMap search(String query, String type, int limit, int offset, String includeExternal, String username) {
        String spotifyAccessToken = stringEncryptor.decrypt(redisService.getValue("spotifyAccessToken:" + username));

        // Build GET request to search for tracks
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create("https://api.spotify.com/v1/search" + "?q=" + URLEncoder.encode(query, StandardCharsets.UTF_8) + "&type=" + type + "&limit=" + limit + "&include_external=" + includeExternal)).header("Authorization", "Bearer " + spotifyAccessToken).header("Accept", "application/json").GET().build();

        // Send request asynchronously
        HttpClient client = HttpClient.newHttpClient();
        try {
            CompletableFuture<HttpResponse<String>> responseFuture = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper objectMapper = new ObjectMapper();
            return responseFuture.thenApply(response -> {
                try {
                    return objectMapper.readValue(response.body(), HashMap.class);
                } catch (IOException e) {
                    e.printStackTrace();
                    return null;
                }
            }).join();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
