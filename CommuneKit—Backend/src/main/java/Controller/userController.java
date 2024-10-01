package Controller;

import Model.User;
import Repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class userController {
    @Autowired
    private userRepository userRepository;

    @GetMapping("/quotes")
    public List<User> getQuotes(@RequestParam("search") Optional<String> searchParam){
        return searchParam.map( param->userRepository.getContainingQuote(param) )
                .orElse(userRepository.findAll());
    }

    @GetMapping("/quotes/{quoteId}" )
    public ResponseEntity<String> readQuote(@PathVariable("quoteId") Long id) {
        return ResponseEntity.of(userRepository.findById(id).map(User::getUser));
    }

    @PostMapping("/quotes")
    public User addUser(@RequestBody String name) {
        User u = new User();
        u.setUser(name);
        return userRepository.save(u);
    }

    @RequestMapping(value="/quotes/{quoteId}", method=RequestMethod.DELETE)
    public void deleteQuote(@PathVariable(value = "quoteId") Long id) {
        userRepository.deleteById(id);
    }
}